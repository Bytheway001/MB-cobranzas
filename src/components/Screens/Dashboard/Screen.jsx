import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import { LoadingCard} from '../../custom';
import { getClientList } from '../../../ducks/clients';
import { Criteria } from './Criteria';
import { ActionBar } from './ActionBar';
import { SmartTable } from '../../library/SmartTable';
import { SmartCard } from '../../library/SmartCard';

const Dashboard = ({ getClientList, clients, user }) => {
    const [criteria, setCriteria] = useState('')
    const [term, setTerm] = useState('')
    useState(() => {
        getClientList()
    }, [])

    const changeCriteria = (value) => {
        setTerm('');
        setCriteria(value)
    }
    const handleSubmit = (e,term,criteria) => {
        e.preventDefault()
        console.log(term,criteria)
        getClientList({ criteria, term })
    }

    const rows=['id','first_name','agent','collector','company','plan','option','renovation_date','effective_date','frequency','status']
   
    return (
        <Row>
            <Col sm={4}>
                <Criteria
                    title='Buscar Cliente'
                    onSubmit={handleSubmit}
                    changeCriteria={changeCriteria}
                    term={term}
                    criteria={criteria}
                    setTerm={setTerm}
                    loading={clients.loading}
                />

            </Col>
            <Col sm={8} >
                <ActionBar user={user} />
            </Col>
            <Col sm={12} className='mt-5'>
                <SmartCard title='Listado de clientes'>

                        {
                            clients.loading ?

                                <LoadingCard />
                                :
                                <SmartTable 
                                    list={clients.list} 
                                    headers={['ID','Nombre','Agente','Cobrador','Aseguradora','Plan','Opcion','Fecha Renovacion','Fecha Efectiva','Frecuencia','Estado']}
                                    rows={rows}
                                    paginated={true}
                                    actions={true}
                                />
                     

                        }

                  </SmartCard>
            </Col>
        </Row >
    )
}



const mapStateToProps = state => ({
    clients: state.clients,
    user: state.session.user
})

const mapDispatchToProps = dispatch => ({
    getClientList: (search) => dispatch(getClientList(search))
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)