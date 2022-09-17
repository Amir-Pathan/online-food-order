import React,{Component} from 'react'
import Services from '../services/services'
import { Paper } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function orderItem(product,ord){

    return(
        <Paper>
            <Grid container item xs={12} md={12} spacing={2}>
                <Grid item xs={3} md={4}>
                    <img src={product.productImg} alt="" 
                    style={{
                        width:'80px',
                        height:'80px'
                    }}
                    />
                </Grid>
                <Grid container item xs={9} md={8}>
                    <Grid item xs={12} md={12}>
                        <Typography variant='h5'>{product.productName}</Typography>
                    </Grid>
                    <Grid item xs={4} md={4}><CurrencyRupeeIcon/>{ord.price}</Grid>
                    <Grid item xs={4} md={4}>{ord.qty}</Grid>
                    <Grid item xs={4} md={4}><CurrencyRupeeIcon/>{ord.price*ord.qty}</Grid>
                </Grid>
            </Grid>
        </Paper>
    )

}

class Orders extends Component{

    constructor(){
        super()
        this.state={
            orders:[],
            product:[],
            loading:true
        }
    }

    componentDidMount(){

        const user = Services.getUser()

        Services.getData('orders/customerId/'+user._id).then((res)=>{

            this.setState({
                ...this.state,
                orders:res
            })

          const promise = res.map((i)=>{

                return Services.getData('products/product/'+i.productId).then((res)=>{
                    return res[0]
                }).catch((err)=>{

                    alert('something wrong')

                })

            })

            Promise.all(promise).then((res)=>{
                this.setState({
                    ...this.state,
                    product:res,
                    loading:false
                })
            }).catch((err)=>{
                console.log(err);
            })

        }).catch((err)=>{

            console.log(err);

        })

    }


    render(){

        console.log(this.state)

        return(
            <>
              {
                 this.state.loading?
                    <h1>Loading</h1>
                 :
                 <>
                  <Typography variant='h6'>Orders</Typography>
                  {
                 this.state.product.length>0?
                   this.state.product.map((i,index)=>{

                    return <div key={index}>{ orderItem(i,this.state.orders[index])}</div>

                   })
                 :null
                }
                  </>
              }
            </>
        )

    }

}

export default Orders