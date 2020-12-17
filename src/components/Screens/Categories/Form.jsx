import React,{useState} from 'react';

import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API } from '../../../utils/utils';
import { Input, Select } from '../../../Controls';


const CategoryForm = ({categoryList,editing}) => {
    const [name,setName]=useState(editing.name||'');
    const [parent_id,setParentId]=useState(editing.parent_id||'');

    const handleSubmit = (e) => {

        e.preventDefault();
        let category={name,parent_id}
        if(editing){
            Axios.put(API+'/categories/'+editing.id,category).then(res=>{
                alert(res.data.data)
            })
            .catch(err=>{
                alert(err.response.data)
            })
        }
        else{
            Axios.post(API+'/categories',category).then(res=>{
                alert(res.data.data)
            })
            .catch(err=>{
                alert(err.response.data)
            })
        }
       
    }
    return (
        <Form id='category-form' onSubmit={handleSubmit}>
            <Input value={name} onChange={({target})=>setName(target.value)} type='text' label='Nombre de la categoria'/>
            <Select value={parent_id} onChange={({target})=>setParentId(target.value)} label='Categoria Padre:' options={categoryList.map((x,k)=>(<option key={k} value={x.id}>{x.name}</option> ))}/>
        </Form>
    )
}




export default connect(null,null)(CategoryForm)