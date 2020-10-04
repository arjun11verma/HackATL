import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import firebase from './Firebase.js'

class PurchaseView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    purchase = () => {
        firebase.database().ref("Products").once('value').then(function(snapshot) {
            snapshot.forEach(childSnapshot => {
                if(childSnapshot.child("clicked").val()) {
                    firebase.database().ref("Products").child(childSnapshot.child("name").val()).remove();
                }
            });
        });  

        setTimeout(() => {
            window.close()
        }, 2000);
    }

    render() {
        return(<>
            <Grid container direction="column" alignItems="center" style={{ backgroundColor: "azure", padding: "10px", marginTop: "140px" }} spacing={5}>
                <Grid item>
                    <h2 style={{ fontFamily: "Garamond" }}>Purchasing Window</h2>
                </Grid>
                <Grid item>
                    <p1 style={{ fontFamily: "Garamond" }}>Please enter your payment credentials below and press the button below if you are absolutely sure about buying our product.</p1>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="cardNum">Card Number</InputLabel>
                        <Input id="cost" aria-describedby="my-helper-text" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="userCred">Payment Credentials</InputLabel>
                        <Input id="cost" aria-describedby="my-helper-text" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button onClick = {this.purchase} style = {{fontFamily: "Garamond"}}>Click to purchase the product</Button>
                </Grid>
            </Grid>
        </>)
    }
}

export default PurchaseView;