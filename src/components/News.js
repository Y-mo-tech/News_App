import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  //document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;


  const capitalizeFirstLetter = (string)=>{
     return string.charAt(0).toUpperCase() + string.slice(1);
  }

    const updateNews = async ()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1bf0da46fb184710b4d50d8321a2abb4&page=1&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setarticles(parsedData.articles)
    setloading(false)
    settotalResults(parsedData.totalResults)

  }

  useEffect(() => {
    updateNews();
  }, [])
  
  const handlePrevClick = async ()=>{

  //  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1bf0da46fb184710b4d50d8321a2abb4&page=${this.state.page-1}&pageSize=${props.pageSize}`;
  //  this.setState({loading : true})
  //  let data = await fetch(url);
  //  let parsedData = await data.json()
  //  console.log(parsedData);
  //  this.setState({articles: parsedData.articles,
  //     page: this.state.page-1,
  //     loading: false
  //    })

  setpage(page-1)
  updateNews();
  }

  const handleNextClick = async ()=>{
  //  //if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
  //    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1bf0da46fb184710b4d50d8321a2abb4&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //    this.setState({loading : true})
  //    let data = await fetch(url);
  //    let parsedData = await data.json()
  //    console.log(parsedData);
  //    this.setState({articles: parsedData.articles,
  //       page: this.state.page+1,
  //       loading: false
  //      })
  //  //}
  setpage(page+1)
  updateNews();
  }

  const fetchMoreData = async ()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1bf0da46fb184710b4d50d8321a2abb4&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    setloading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setloading(false)

  }
 
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin: '30px 0px', marginTop: '90px'}}>NewsMonkey - Top headlines from {capitalizeFirstLetter(props.category)}</h1>
       {/* {this.state.loading && <Spinner/>} */}
       <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="row my-3">
         {articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
           <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""}
            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
         })
         }        
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between"> */}
        {/* <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button> */}
        {/* <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button> */}
        {/* </div> */}
      </div>
    )
  //}
}

 News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

 News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News