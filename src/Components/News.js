import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalize = function (str1) {
    return str1.charAt(0).toUpperCase() + str1.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalize(this.props.category)} - News Monkey`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2b5483ae48e145498425f0605e7cb890&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    this.setState(
      {
        page: this.state.page - 1,
      },
      () => this.updateNews()
    );
  };
  handleNextClick = async () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => this.updateNews()
    );
  };

  render() {
    return (
      <div className="container my-4  ">
        <h1 className="text-center" style={{ marginBottom: "2rem" }}>
          NewsMonkey - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles.map((elem) => {
            return (
              <div className="col-md-4" key={elem.title}>
                <NewsItem
                  title={elem.title ? elem.title : ""}
                  description={elem.description ? elem.description : ""}
                  imageUrl={elem.urlToImage}
                  newsUrl={elem.url}
                  author={elem.author}
                  date={elem.publishedAt}
                  source={elem.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            &laquo; previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button "
            onClick={this.handleNextClick}
            className="btn btn-dark "
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}
