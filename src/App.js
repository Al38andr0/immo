// noinspection JSCheckFunctionSignatures

import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { useEffect, useState } from "react";
import { fetchProperties, fetchPropertyDetails, getAvailablePropertyTypes } from "./js/api";
import PropertyTable from "./components/PropertyTable/PropertyTable";
import Search from "./components/Search/Search";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";

const App = () => {

  const model = {
    query: '',
    type: '',
    error: false,
    isLoading: false,
    collection: []
  }
  const [pageData, setPageData] = useState({...model})
  const [savedProperties, setSavedProperties] = useState([])
  const [types, setTypes] = useState([])

  const errorHandler = error => {
    console.log(error)
    setPageData(prevState => (
      {
        ...prevState,
        collection: [],
        isLoading: false,
        error: typeof pageData.query === 'string' && pageData.query.trim() !== ''
      }))
  }

  useEffect(() => {
    setPageData(prevState => (
      {
        ...prevState,
        error: false,
        isLoading: true
      }
    ))
    const searchObject = pageData.type && pageData.type !== 'all' ?
      {
        address: pageData.query,
        propertyType: pageData.type
      } :
      {
        address: pageData.query
      }

    fetchProperties(searchObject)
      .then(response => {
        const data = response.properties
        const promises = []
        data.forEach(property => {
          property.isSaved = savedProperties.some(item => item.id === property.id)

          promises.push(new Promise( resolve => resolve(
            fetchPropertyDetails(property.id).then(response => (
              {
                ...property,
                ...response.property
              }))
          )))
        })
        Promise.all(promises)
          .then(data => {
            setPageData(prevState => (
              {
                ...prevState,
                isLoading: false,
                collection: data
              }
            ))
          })
          .catch(errorHandler)
      })
      .catch(errorHandler)

  }, [pageData.query, pageData.type])

  useEffect(() => {
    getAvailablePropertyTypes()
      .then(response => {
        response.propertyTypes.forEach(type => {
          type.selected = false
        })
        response.propertyTypes.sort((a, b) => a.label > b.label ? 1 : -1)
        const all = {
          label: 'All',
          value: 'all',
          selected: true
        }
        setTypes([all, ...response.propertyTypes])
      })
  }, [])

  const handleSubmit = (event, value) => {
    setPageData(prevState => ({
      ...prevState,
      query: value
    }))
  }

  const filterByType = (event, value) => {
    setPageData(prevState => ({
      ...prevState,
      type: value
    }))
    setTypes(prevState => {
      console.log(prevState)
      return prevState.map(type => ({
        ...type,
        selected: type.value === value
      }))
    })
  }

  const handleSave = (event, property) => {
    setPageData(prevState => {
      const collection = prevState.collection.map(item => (
        {
          ...item,
          isSaved: item.id === property.id ? !item.isSaved : item.isSaved
        }))
      return {
        ...prevState,
        collection: collection
      }
    })
    setSavedProperties(prevState => {
      return prevState.some(item => item.id === property.id) ?
        prevState.filter(item => item.id !== property.id) :
        [...prevState, property]
    })
  }

  return (
    <>
      <Header/>
      <div className="container">
        <div className="empty-section hide-mobile">&nbsp;</div>
        <section className="search-section">
          <Search query={pageData.query} callback={handleSubmit}/>
          {
            savedProperties.length !== 0 &&
            <PropertyTable
              title="Selected properties"
              collection={savedProperties}
              allFields={false}
            />
          }
        </section>
        <aside className="side-bar-section">
          <SideBar types={types} callback={filterByType}/>
        </aside>
        <section className="results-section">
          {pageData.isLoading && <Loader/>}
          {!pageData.isLoading && pageData.error && <ErrorMessage/>}
          {
            !pageData.isLoading && pageData.collection.length !== 0 &&
            <PropertyTable
              title="Search results"
              collection={pageData.collection}
              allFields={true}
              callback={handleSave}
            />
          }
          {
            !pageData.isLoading && !pageData.error && pageData.collection.length === 0 &&
              <h4>{pageData.query !== '' ? 'No properties found' : 'A full or partial address is required'}</h4>
          }
        </section>
      </div>
    </>
  )
}

export default App;
