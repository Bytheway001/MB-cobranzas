import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Card} from 'react-bootstrap';
import { CreateModal } from './CreateModal';
import Axios from 'axios';
import { API } from '../../../ducks/root';
export const Categories = () => {
    const [categoryList, setCategoryList] = useState([])
    useEffect(() => {
        Axios.get(API + '/categories').then(res => {
            setCategoryList(res.data.data);
        })
    }, [])

    return (
        <Row>
            <Col sm={12}>Categorias</Col>
            <Col sm={12}>
                <Card>
                    <Card.Header className='bg-primary w-100 d-flex flex-row text-white align-items-center justify-content-between'>
                        <span>Categorias</span>
                        <CreateModal categoryList={categoryList} text='Nueva' />
                    </Card.Header>
                    <Card.Body>
                        <Table style={{fontSize:'0.8em'}} size='sm' variant='striped'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Categoria Padre</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList.filter(x=>x.name!=='Principal').map(category => (
                                    <tr>
                                        <td>{category.name}</td>
                                        <td>{category.parent_id?category.parent:"Categoria Principal"}</td>
                                        <td><CreateModal btnStyle={{fontSize:'0.8em'}} text='Editar' categoryList={categoryList} editing={category} /></td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    )
}