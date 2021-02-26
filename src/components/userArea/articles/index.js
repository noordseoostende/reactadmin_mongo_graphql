import React, {useReducer, useEffect} from 'react';
import UserAreaHOC from '../../hoc/userAreaHoc';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts,updatePostStatus, removePost } from '../../../store/actions';


const Articles = (props) => {
  const [ sort, setSort] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {limit:3,order:"desc",sortBy:"_id",skip:0}
  );
  const user = useSelector( state => state.user );
  const dispatch = useDispatch();

  const updateStatusHandler = (item) =>{
    const status = item.status === 'DRAFT' ? 'PUBLIC':'DRAFT';
    dispatch(updatePostStatus(status,item._id,user.posts))
  }

  useEffect(()=>{
    dispatch(getUserPosts(sort,[],user.auth._id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <UserAreaHOC>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titel</th>
            <th>Categorie</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            user.posts ?
              user.posts.map((item,i)=>(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item.title}</td>
                  <td>{item.category.name}</td>
                  <td
                  onClick={ ()=> updateStatusHandler(item)}
                    className={
                      item.status === 'DRAFT'? 'yell':'green'
                    }
                  >{item.status}</td>
                  <td 
                    onClick={()=>{
                      dispatch(removePost(item._id,user.posts))
                    }}
                    className="remove_btn">
                    Verwijder
                  </td>
                </tr>
              ))
            :null
          }
        </tbody>

      </Table>
      <Button 
      onClick={()=>{
        let skip = sort.skip +  sort.limit;
        dispatch(
          getUserPosts({...sort,skip:skip},user.posts,user.auth._id)
        ).then(()=>{
          setSort({limit:3,order:"desc",sortBy:"_id",skip:0});
        })
      }}
      >
        Laad meer
      </Button>

      <Button 
      className="ml-2"
      variant="outline-info"
      onClick={()=>{
        props.history.push('/user_area/create')
      }}
      >
        Creer de article
      </Button>
    </UserAreaHOC>
  )
}

export default Articles;
