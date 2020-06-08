import React from 'react';
import { getClientList } from '../../ducks/agents';
import { useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';

const ClientSelect = ({list,getClientList,onChange,selected})=>{
    useEffect(()=>{
        getClientList()
    },[])
    return(
        <Typeahead id='client' options={list} onChange={onChange} selected={selected} labelKey='name' />
    )
}

const mapStateToProps = state=>(
    {
        list:state.clients.list
    }
)

const mapDispatchToProps = dispatch =>(
    {
        getClientList:()=>dispatch(getClientList())
    }
)



export default connect(mapStateToProps,mapDispatchToProps)(ClientSelect)