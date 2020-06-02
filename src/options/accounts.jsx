
import React,{Fragment} from 'react';
import {connect} from 'react-redux'

const AccountsOptions = ({except,only,list}) => {
    let options = list;
    if(except){
        options = options.filter(x=>except.findIndex(e=>x.id==e)===-1);
    }
    if(only){
        options = options.filter(x=>only.findIndex(e=>x.id==e)!==-1);
    }

    return (
        <Fragment>
            {
                options.map((option,index)=>(
                    <option value={option.id} key={index}>{option.name}</option>
                ))
            }
        </Fragment>
    )
}

const mapStateToProps = state=>(
    {
        list:state.accounts.list
    }
)

const mapDispatchToProps = dispatch =>(
    {}
)

export default connect(mapStateToProps,mapDispatchToProps)(AccountsOptions);