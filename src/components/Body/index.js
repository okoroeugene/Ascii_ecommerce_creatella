import React from 'react';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';
import axios from 'axios';
import { relativeTime, genRan } from '../../helpers';
import Ads from '../Ads';
import './index.css';

export default class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            filteredProducts: [],
            sort: undefined,
            isFetching: true,
            isScrollFetching: false,
            filterFinished: false,
            message: 'not at bottom',
            meta: undefined,
            ads: false,
            adSrc: [],
            fetchAds: false
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.filterStart = 0;
        this.itemsPerFilter = 12;
        this.filterEnd = 0;
        this.index = 0;
        this.scrolled = false;
        this.lastIndex = null;
        this.query = 0;
    }

    /****
     * For the purpose of this project, i did not use redux for state management
     * Redux would definitely come in handy when am doing a full blown application
     * I could as well come up with the react native project for this task
     * @fetchProduct is called at the initial render of this component, this fetches all products from the API given
     * @appendAdvert handles the logic for the ADS appearing after every 20th product displayed
     * @filterProducts returns the filtered product array and paginates it (Infinte Scroll)
     * @handleSort returns the sorted product
     * @handleScroll checks if the user has scrolled to the bottom of the webpage
     * @showAds returns the jsx component for the ad banner
     * @productView returns the jsx component for the products
     */

    componentDidMount() {
        // var date = new Date();
        // console.log(date)
        this.fetchProduct(`${API_URL}/products`);
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    fetchProduct(url) {
        axios.get(url).then(response => {
            this.setState({
                isFetching: false,
                products: this.appendAdvert(response.data)
            })
            this.filterProducts();
        })
    }

    appendAdvert(product) {
        var tempProduct = [];
        product.map((products, key) => {
            if (key !== 0 && (key % 20) === 0) {
                products = Object.assign(products, {
                    advert: true,
                    adQuery: Math.round(Math.random() * 1000)
                })
            }
            tempProduct.push(products);
        })
        return tempProduct;
    }

    filterProducts(event) {
        var products = event === "sort" ? this.appendAdvert(this.state.products) : this.state.products;
        if (this.state.products.length < this.filterEnd) {
            return this.setState({
                filterFinished: true,
                isScrollFetching: false,
                filteredProducts: products.slice(this.filterStart, this.filterEnd)
            })
        }

        event !== "sort" ? this.filterEnd += this.itemsPerFilter : this.filterEnd;
        return this.setState({
            filteredProducts: products.slice(this.filterStart, this.filterEnd),
            isScrollFetching: true
        })
    }

    handleSort(event) {
        this.setState({ isFetching: true, isScrollFetching: false, filterFinished: false })
        let { name, value } = event.target;
        axios.get(`${API_URL}/api/products?_sort=${value}`).then(response => {
            this.setState({
                isFetching: false,
                products: response.data
            }, () => {
                this.filterProducts("sort");
            })
        })
    }

    handleScroll() {
        if (!this.scrolled) {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) && this.filterEnd > 0) {
                this.scrolled = true;
                setTimeout(() => {
                    this.filterProducts();
                    this.scrolled = false;
                }, 2000);
            }
        }
    }

    showAds(meta, key) {
        return (
            <Col key={key} sm={12} style={{ paddingBottom: 20 }}>
                <Card className="card0" style={{ padding: 10 }}>
                    <Ads query={meta.adQuery} />
                </Card>
            </Col>
        );
    }

    productView(product) {
        let _ads, _main;
        return product.map((items, i) => {
            _main = <Col key={i} sm={3} style={{ paddingBottom: 20 }}>
                <Card className="card0" style={{ padding: 10 }}>
                    <div>
                        <span className="date1">{relativeTime(items.date)}</span>
                    </div>
                    <Card.Body className="coverProduct" style={{ textAlign: "center", fontSize: items.size }}>
                        <div className="face0">{items.face}</div>
                    </Card.Body>
                    <div style={{ paddingTop: 5 }}>
                        <div className="date0">
                            <div>
                                <b>Size</b>: <span>{items.size}</span>
                                <br />
                                <b>Price</b>: <span>&#36;{items.price}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
            _ads = i !== 0 && (i % 20) === 0 ? this.showAds(items, i) : null;
            if (!_ads || !_main)
                return _ads || _main
            return [_ads, _main]
        })
    }

    render() {
        const { filteredProducts } = this.state;
        return (
            <Container>
                <section>
                    <Row>
                        <Col sm={12} ref="card">
                            <span>
                                Showing{" "}
                                <b>{filteredProducts.length > 0 && filteredProducts.length}{" "}</b>
                                faces
                            </span>
                            <Card className="card0">
                                <Card.Header className="cardHead0">
                                    <div style={{ float: "left" }}>
                                        <span>EXPLORE POPULAR ASCII FACES</span>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        <select
                                            style={{
                                                width: 210,
                                                height: 35
                                            }}
                                            className="form-control"
                                            onChange={this.handleSort.bind(this)}
                                            name="sort"
                                        >
                                            <option>-- sort data --</option>
                                            <option value="price">price</option>
                                            <option value="size">size</option>
                                            <option value="id">id</option>
                                        </select>
                                    </div>
                                </Card.Header>
                                <Row id="ad0" ref="ad0" style={{ padding: 35, flex: 1, justifyContent: "center" }}>
                                    {
                                        this.state.isFetching ? <h3 style={{ textAlign: "center" }}><span>Loading...</span></h3> : this.productView(this.state.filteredProducts)
                                    }
                                </Row>
                                {
                                    this.state.isScrollFetching && this.state.filteredProducts.length > 0 ?
                                        <p><h3 style={{ textAlign: "center" }}><span>Loading...</span></h3></p> : null
                                }
                                {
                                    this.state.filterFinished && this.state.filteredProducts.length > 0 ?
                                        <p><h3 style={{ textAlign: "center", color: "#B22222" }}>--- end of catalogue ---</h3></p> : null
                                }
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Container >
        );
    }
}