import React, { Component } from 'react'
import Product from './Product.js'
import firebase from './Firebase.js'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: []
        };

        var eachInput = []

        firebase.database().ref("Products").once('value').then(function(snapshot) {
            snapshot.forEach(childSnapshot => {
                childSnapshot.forEach(subSnapshot => {
                    eachInput = eachInput.concat(subSnapshot.val());
                });
            });
        });

        setTimeout(() => {
            for(var i = 0; i < (eachInput.length)/6; i++) {
                this.addProduct(eachInput, i);
            }
        }, 1000);
    }

    addProduct = (items, weight) => {
        var inputList = this.state.productList;
        var w = 1 + weight*6;

        var costR = items[0 + w];
        var descriptionR = items[1 + w];
        var expirationR = items[2 + w];
        var hospitalR = items[3 + w];
        var nameR = items[4 + w];

        this.setState({
            productList: inputList.concat(<Product name = {nameR} cost = {costR} sourceHospital = {hospitalR} description = {descriptionR} expirationDate = {expirationR}/>)
        });
    }

    goToAddProduct = () => {
        window.open('/AddProduct')
    }

    render() {
        return (<>
            <div>
                <AppBar><Typography variant='h4' style={{ fontFamily: "Garamond", textAlign: "center" }}>MedConnection - Linking Hospitals to Local Clinics</Typography></AppBar>
            </div>

            <Grid container justify = "center">
                <Grid item>
                    <Button onClick = {this.goToAddProduct} style = {{marginTop: "47px", textAlign: "center", textTransform: "none"}}>
                        <Typography variant = "h6" style = {{fontFamily: "Garamond"}}>If you are a hospital associate, click here to add a product!</Typography>
                    </Button>
                </Grid>
            </Grid>
           
            <Grid container direction="row" style = {{marginLeft: "0px", marginTop: "0px", width: "1520px"}} spacing = {5}>
                {this.state.productList}
            </Grid>
        </>);
    }
}

export default Homepage;