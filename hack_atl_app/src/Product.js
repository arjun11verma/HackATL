import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import firebase from './Firebase.js'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            description: this.props.description,
            cost: this.props.cost,
            expirationDate: this.props.expirationDate,
            sourceHospital: this.props.sourceHospital,
            clicked: false
        };
    }

    purchaseWindow = () => {
        var name = this.state.name;
        firebase.database().ref("Products").child(name).child("clicked").set(true);
        setTimeout(() => {
            window.open('/PurchaseView');
        }, 500);
    }

    render() {
        return (<>
            <Grid item>
                <CardActionArea onClick={this.purchaseWindow} style={{ width: "720px", height: "220px" }}>
                    <Card style={{ backgroundColor: "azure", width: "700px", height: "200px", padding: "10px" }}>
                        <Grid container spacing={2} alignItems="center" direction="column" padding="50px" justify="center">
                            <Grid item>
                                <Typography variant="h5">{this.state.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="p3">{this.state.description}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="p3">Cost: {this.state.cost}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="p3">Expiration Date: {this.state.expirationDate}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="p3">Source Hospital: {this.state.sourceHospital}</Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </CardActionArea>
            </Grid>
        </>);
    }
}

export default Product;
