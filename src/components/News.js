import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const updateNews = async () => {
        props.setProgress(10);
        setLoading(true);
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(parsedData.articles || []);
            setTotalResults(parsedData.totalResults || 0);
            setPage(1);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
        setLoading(false);
        props.setProgress(100);
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - InsightStream`;
        updateNews();
        // eslint-disable-next-line
    }, [props.category]);  // Ensure re-fetching when category changes

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles((prevArticles) => [...prevArticles, ...(parsedData.articles || [])]);
            setTotalResults(parsedData.totalResults || 0);
        } catch (error) {
            console.error("Error fetching more news:", error);
        }
    };

    return (
        <>
            <h1 className="text-center my-4 news-heading">
                📰 <span className="highlight">{capitalizeFirstLetter(props.category)}</span> News
            </h1>
            {loading && <div className="text-center"><Spinner /></div>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-4 d-flex align-items-stretch" key={element.url}>
                                <div className="card news-card">
                                    <img src={element.urlToImage || "https://via.placeholder.com/300"} className="card-img-top" alt="News" />
                                    <div className="card-body">
                                        <h5 className="card-title">{element.title || "No Title"}</h5>
                                        <p className="card-text">{element.description || "No Description available."}</p>
                                        <p className="card-text"><small className="text-muted">By {element.author || "Unknown"} on {new Date(element.publishedAt).toDateString()}</small></p>
                                        <a
                                            href={element.url ? element.url : "#"}
                                            className="btn btn-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Read More
                                        </a>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;
