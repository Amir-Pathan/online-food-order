import React, { useEffect,useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Services from '../../services/services';
import { useNavigate } from 'react-router-dom';

export default function ImageCorousel(props)
{
    
    const [items,setItems] = useState([])


    useEffect(()=>{
        Services.getData('categories').then((res)=>{
            console.log(res);
            setItems(res)
        }).catch((err)=>{
            console.log(err);
        })

    },[])

    return (
        <Carousel 
         interval={5000} 
         indicators={true}
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    const navigate = useNavigate()

    const toCategory=(id)=>navigate('category/'+id)

    return (
        <Paper onClick={()=>toCategory(props.item._id)}>
            <img src={props.item.imgUrl}
            style={{
                width:'98%',
                maxHeight:'600px',
                minHeight:'200px',
                marginLeft:'1%',
                marginRight:'1%',
                marginRight:'5px',
                marginTop:'70px',
                borderRadius:'25px'
            }}/>
            <div style={{marginTop:'-35%',marginLeft:'13%',color:'black'}}>
              <h2>{props.item.categoryName}</h2>
               <div style={{marginLeft:'15px',marginTop:'-10px'}}>
                Delicious dishes for you on 50% <br/>
                discount and free delivery
               </div>
            </div>
        </Paper>
    )
}