import { Grid } from "@mui/material";
import React,{Component} from "react";
import Services from "../services/services";
import ProductCard from "../lib/product/product";

class Wishlist extends Component{
    constructor(){
        super()
        this.state={
              loading:true,
              products:[]
        }
    }

    componentDidMount(){

        const fvrt = Services.getFvrt()

        const wishlist = fvrt.map((i)=>{

            return Services.getData('products/product/'+i).then((res)=>{

                return res[0]

            }).catch((err)=>{

                alert('something Wrong')

            })

        })

        Promise.all(wishlist).then((res)=>{

            this.setState({
                ...this.state,
                products:res,
                loading:false
            })

        }).catch((err)=>{
            console.log(err);
        })

    }

    render(){

        return(
            <>
            {
                this.state.loading?
                <h2>Loading</h2>:
                this.state.products.length===0?
                <h1>Your Wishlist Is Empty</h1>:
                <Grid container item xs={12} md={12}  spacing={2}> {
                this.state.products.map((i,index)=>{

                    return <Grid item xs={12} md={4}>
                      <ProductCard
                      imgUrl={i.productImg}
                      name={i.productName}
                      id={i._id}
                      originalPrice={i.productOriginalPrice}
                      userId={i.userId}
                      maxQty={i.productMaxQty}
                      />
                    </Grid>

                })
            }
            </Grid>
            }
            </>
        )

    }

}

export default Wishlist