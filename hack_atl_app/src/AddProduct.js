import React, { Component } from 'react'
import firebase from './Firebase.js'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class AddProduct extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            specList: ["name", "description", "cost", "expiration", "hospital"]
        }
    }

    addProduct = () => {
        var specs = (this.getProductSpecs());
        for (var i = 0; i < 5; i++) {
            firebase.database().ref("Products").child(specs[0]).child(this.state.specList[i]).set(specs[i]);
        }
        firebase.database().ref("Products").child(specs[0]).child("clicked").set(false);
    }

    getProductSpecs = () => {
        var specs = ["", "", "", "", ""]
        for (var i = 0; i < 5; i++) {
            specs[i] = document.getElementById(this.state.specList[i]).value;
            document.getElementById(this.state.specList[i]).value = "";
        }
        return specs
    }

    submit = () => {
        this.addProduct();
    }

    render() {
        return (<>
            <Grid container direction="column" alignItems="center" style={{ backgroundColor: "azure", padding: "9px", marginTop: "45px" }} spacing={5}>
                <Grid item>
                    <h2 style={{ fontFamily: "Garamond" }}>Please fill in the fields below.</h2>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="name">Product Name</InputLabel>
                        <Input id="name" aria-describedby="my-helper-text" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="description">Product Description</InputLabel>
                        <Input id="description" aria-describedby="my-helper-text" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="cost">Product Cost</InputLabel>
                        <Input id="cost" aria-describedby="my-helper-text" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="expiration">Expiration Date</InputLabel>
                        <Input id="expiration" aria-describedby="my-helper-text" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="hospital">Hospital Name</InputLabel>
                        <Input id="hospital" aria-describedby="my-helper-text" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button onClick={this.submit} style={{ backgroundColor: "whitesmoke", fontFamily: "Garamond" }}>Click to submit your product!</Button>
                </Grid>
            </Grid>
        </>)
    }
}

export default AddProduct;