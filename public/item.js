class Item extends React.Component {
    constructor(){
        super();
    }

    render(){
        console.log(this.props.items);
        return (
            <div>
                <div>This is the Item class from react</div>
                <div>{this.props.items.map(function(v, i){
                    return (
                        <div className="item" key={i}>
                            <p>{v.bzip}</p>
                            <p>{v.gittername}</p>
                        </div>
                    )
                })}</div>
            </div>
        )
    }
}

class MyForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newItem: {
                bzip: '',
                gittername: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        console.log('hi from myForm class');
        this.props.handlePost(this.state.newItem);
        this.setState({
            newItem: {
                bzip: '',
                gittername: ''
            }
        });
        document.getElementById('bzip').focus();
    }

    handleInputChange(e){
        const name = e.target.name;
        let value = e.target.value;
        let newItem = Object.assign({}, this.state.newItem, {[name]: value});
        this.setState({
            newItem
        });
    }

    render(){
        return (
            <form className="itemForm">
                bf / zip: <input id="bzip" name="bzip" type="text" value={this.state.newItem.bzip} onChange={this.handleInputChange} />
                gittername: <input name="gittername" type="text" value={this.state.newItem.gittername} onChange={this.handleInputChange} />
                <input id="submitButton" type="button"  onClick={this.handleSubmit} />
            </form>
        )
    }
}

class All extends React.Component {
    constructor(){
        super();
        this.handlePost = this.handlePost.bind(this);
        this.state = {
            items: []
        }
    }

    componentDidMount(){
        let that = this;
        axios.get('/data')
            .then(function (response) {
                console.log('hi from axiox.get in comp All');
                console.log(response);
                that.setState({
                    items: response.data.store
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handlePost(item){
        let that = this;
        console.log('handlePost in component Item was triggert');
        axios({
            method: 'post',
            url: '/newItem',
            data: item})
            .then(function (response) {
                console.log(response);
                that.setState({ items: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        return (
            <div>
                <Item items={this.state.items} />
                <MyForm handlePost={this.handlePost} />
            </div>
        )
    }
}

ReactDOM.render(<All />, document.getElementById('item'));