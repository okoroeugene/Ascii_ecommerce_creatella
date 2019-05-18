import React from 'react';
import {
    Container,
    Row,
    FormControl,
    Button,
    ListGroup,
    Carousel,
    Col,
    InputGroup,
    Card
} from 'react-bootstrap';
import axios from 'axios';
import { relativeTime, genRan } from '../helpers';
import Ads from './Ads';

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
            adSrc: []
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.filterStart = 0;
        this.itemsPerFilter = 12;
        this.filterEnd = this.itemsPerFilter;
        this.index = 0;
    }
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
                products: response.data
            })
            this.filterProducts();
        })
    }
    filterProducts() {
        if (this.state.products.length < this.filterEnd) {
            return this.setState({
                filterFinished: true,
                isScrollFetching: false
            })
        }
        return this.setState({
            filteredProducts: this.state.products.slice(0, this.filterEnd),
            filterStart: this.filterStart += this.itemsPerFilter,
            filterEnd: this.filterEnd += this.itemsPerFilter,
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
            })
            this.filterProducts();
        })
    }
    handleScroll() {
        // this.setState({ isScrollFetching: true, filterFinished: false })
        // let { clientHeight, scrollHeight, offsetHeight, pageYOffset } = this.refs.card;
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) && this.filterStart > 0) {
            this.filterProducts();
        }
    }
    showAds() {
        return (
            <Col sm={12} style={{ paddingBottom: 20 }}>
                <Card className="card0" style={{ padding: 10 }}>
                    <Ads ran={genRan()} />
                </Card>
            </Col>
        );
    }
    productView(product) {
        let _ads, _main;
        var gridView = product.map((items, i) => {
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
                                <b>Price</b>: <span>${items.price}</span>
                                {/* <span>&#8358;{items.price}</span> */}
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
            _ads = i && (i % 20) === 0 ? this.showAds() : null;
            if (!_ads || !_main)
                return _ads || _main
            return [_ads, _main]
        })
        return gridView;
    }
    render() {
        return (
            <Container>
                <section>
                    <Row>
                        <Col sm={12} ref="card">
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
                                    this.state.isScrollFetching && this.state.filteredProducts.length > 0 ? <p><h3 style={{ textAlign: "center" }}><span>Loading...</span></h3></p> : null
                                }
                                {
                                    this.state.filterFinished && this.state.filteredProducts.length > 0 ? <p><h3 style={{ textAlign: "center", color: "#B22222" }}>--- end of catalogue ---</h3></p> : null
                                }
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Container >
        );
    }
}