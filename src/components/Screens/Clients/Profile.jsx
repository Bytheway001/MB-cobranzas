import React, { Fragment } from 'react'
import { Card, Row, Col, Table, Button } from 'react-bootstrap'

export const ClientProfile = props => {
    return (
        <Fragment>
            <Row style={{ height: '30vh' }} className='mb-5'>
                <Col sm={4} className='mb-3 h-100'>
                    <UserData />
                    <UserPayments />
                </Col>
                <Col sm={8}>
                    <AdminNotes />
                    <StaffNotes />
                    <Buttons />
                </Col>
            </Row>

        </Fragment>
    )
}

const StaffNotes = props => (
    <Card className='h-100' style={{maxHeight:'30vh',overflowY: 'scroll' }}>
    <Card.Header className='bg-primary text-light'>Notas (Admin)</Card.Header>
    <Card.Body>
        <Note />
        <Note />
        <Note />
    </Card.Body>
</Card>
)
const Buttons = props => (
    null
)

const AdminNotes = props => (
    <Card className='h-100 mb-3' style={{maxHeight:'30vh',overflowY: 'scroll' }}>
        <Card.Header className='bg-primary text-light'>Notas (Admin)</Card.Header>
        <Card.Body>
            <Note />
            <Note />
            <Note />
        </Card.Body>
    </Card>
)

const Note = props => (
    <Card className='mb-2' >
        <Card.Body>
            <div style={{ position: 'absolute', right: 0, top: 0, border: 'black 1px solid', padding: 5 }}>Important</div>
            <h4>Creador de la nota</h4>
            <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit qui dolor ullam delectus sunt debitis distinctio. Mollitia, repellat sed numquam, adipisci soluta ad maiores libero a iusto sapiente quas voluptas!
        </div>
        </Card.Body>
    </Card>
)

const UserData = props => (
    <Card className='mb-3'>
        <Card.Header className='bg-primary text-light d-flex'>
            <span>Datos del Cliente</span>
            <Button variant='secondary' className='ml-auto' size='sm'>Modificar Datos</Button>
            </Card.Header>
        <Card.Body >
            <div className='w-100 d-flex flex-row justify-content-between'>
                <p>Nombre</p>
                <p>Pedro Perez</p>
            </div>
            <div className='w-100 d-flex flex-row justify-content-between'>
                <p>Numero de Poliza</p>
                <p>12345-BD</p>
            </div>
            <div className='w-100 d-flex flex-row justify-content-between'>
                <p>Aseguradora/Plan</p>
                <p>Best Doctors / Premier Plus</p>
            </div>
            <div className='w-100 d-flex flex-row justify-content-between'>
                <p>Opcion</p>
                <p>5,000</p>
            </div>
        </Card.Body>
      
    </Card>
)

const UserPayments = props => (
    <Card className='h-100'>
        <Card.Header className='bg-primary text-light d-flex'>
            <span>Historial de Pagos (Ultimos 10)</span>
            <Button variant='secondary' className='ml-auto' size='sm'>Registrar Pago</Button>
        </Card.Header>
        <Card.Body >
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vencimiento</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>01/01/1990</th>
                        <th>Vencida</th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>01/01/1991</th>
                        <th>Pagada</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>01/01/1992</th>
                        <th>Abierta</th>
                    </tr>
                </tbody>
            </Table>
        </Card.Body>
    </Card>
)