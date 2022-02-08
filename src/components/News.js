// import React, { useEffect , useState } from "react";
// import NewsItem from "./NewsItem";

// export class News extends Component {
//    
//    async componentDidMount(){
//         // console.log(“cdm”);
//         let url = "https://newsapi.org/v2/everything?q=tesla&from=2021-12-26&sortBy=publishedAt&apiKey=fa25ff2ee09b4ac68803835271ddcd97";
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         // console.log(parsedData);
//         this.setState({articles: parsedData.articles})

//     }

//   render() {
//     return (
//       <div>
//         <div className="container my-4">
//           <h2>NewsZilla Top Headlines</h2>

//           <div className="row">
// {/*
//           {this.state.articles.map((element)=>{

//               return <div key={element.url} className="col-md-4">
//               <NewsItem
//                 title={element.title}
//                 description={element.description}
//                 imageUrl={element.urlToImage}
//               newsUrl = {element.url} />
//             </div>})} */}

// {this.state.articles.map((element)=>{
// return <div className='col-md-4' key={element.url}>
// <NewsItem title={element.title?element.title.slice(0, 45):''} description={element.description?element.description.slice(0, 88):''} imageUrl={element.urlToImage} newsUrl={element.url}/>
// </div>
// })}

//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default News;

import React , { useEffect , useState }from "react";

import NewsItem from "./NewsItem.js";
import  Loading from "./Loading.js";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=> {
 const [articles, setArticles] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(1)
 const [totalResults, setTotalResults] = useState(0)

//  document.title = ` ${this.capitalizeFirstLetter(
//     props.category
//   )} NewsZilla `;


 
   const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  
  const updatepage = async () => {
    props.setProgress(10);
    // https://newsapi.org/v2/top-headlines?country=us&apiKey=fa25ff2ee09b4ac68803835271ddcd97
    const url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
   
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(60);
    let parshdata = await data.json();

    setArticles( parshdata.articles);
    setTotalResults(parshdata.totalResults);
    setLoading(false)
    
    props.setProgress(100);
  };

  useEffect(()=>{
      updatepage();
      document.title =  `${capitalizeFirstLetter(
           props.category
      )} NewsZilla `;

  }, [])

 

  // handleNext = async ()=>{
  //     // console.log(“Next”);
  // //     if ( ! (this.state.page + 1 > Math.ceil(this.state.totalResults/20))){
  // //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4e963e22429e4a518c56acb401e9f7f7&page=${this.state.page+1}&pagesize=${props.pageSize}`
  // //     this.setState({loading: true});
  // //     let data = await fetch(url);
  // //     let parsedData = await data.json()
  // //     console.log(parsedData);
  // //     this.setState({
  // //     page: this.state.page+1,
  // //     articles: parsedData.articles,
  // // loading : false})
  // //     }
  // this.setState({
  //     page: this.state.page+1
  // })
  // this.updatepage();
  // }

  //     handlePrev = async ()=>{
  //     // console.log(“Previous”);
  // //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4e963e22429e4a518c56acb401e9f7f7&page=${this.state.page-1}&pagesize=${props.pageSize}`
  // //     this.setState({loading: true});
  // //     let data = await fetch(url);
  // //     let parsedData = await data.json()
  // //     console.log(parsedData);
  // //     this.setState({
  // //     page: this.state.page-1,
  // //     articles: parsedData.articles,
  // // loading : false})
  // this.setState({
  //     page : this.state.page -1
  // })
  // this.updatepage();
  //     }

 const  fetchMoreData = async () => {
   

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
    // this.setState({loading: true});

    setPage(page + 1)
    let data = await fetch(url);

    let parshdata = await data.json();
    setArticles(articles.concat(parshdata.articles))
    setTotalResults(parshdata.totalResults)
    setLoading(false)
    
  };


    return (
      <>
        <h1 className="text-center" style={{marginTop : "90px"}}>
          NewsZilla Top {capitalizeFirstLetter(props.category)}{" "}
          Headline
        </h1>
        {loading && <Loading />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading />}
        >
          <div className="row mx-2">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element ? element.title : ""}
                    description={element ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.xda-developers.com/files/2021/06/changedefault2.jpg"
                    }
                    newsUrl={element.url}
                    auther={element ? element.author : ""}
                    date={element ? element.publishedAt : ""}
                    source={element ? element.source.name : ""}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {/* <div className="mx-5 d-flex justify-content-between">
                <button type= "button" disabled={this.state.page<=1} className="btn btn-dark" onClick= {this.handlePrev}> &larr; Prevoius</button>
                <button type= "button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-dark" onClick= {this.handleNext}>Next &rarr;</button>

            </div> */}
      </>
    );
  


  
        }

News.defaultProps = {
    pageSize: 5,
    country: "in",
    category: "science",
  };
News.propTypes = {
    pageSize: propTypes.number,
    country: propTypes.string,
    category: propTypes.string,
  };

  export default News; 
