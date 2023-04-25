import React from "react";
import BookTerm from '../BookTerm/BookTerm'
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

class Books extends React.Component{

    constructor(props){
        super(props)

        this.state ={
            page : 0,
            size : 5
        }
    }
    
    render () {

        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books =this.getBooksPage(offset,nextPageOffset)

        return(
            <div>
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>   
                                <th>Author</th>
                                <th>Copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books}
                        </tbody>
                    </table>
                </div>
                <ReactPaginate previousLabel={"back"}
                               nextLabel={"next"}
                               breakLabel={<a href="/#">...</a>}
                               breakClassName={"break-me"}
                               pageClassName={"ml-1"}
                               pageCount={pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination m-4 justify-content-center"}
                               activeClassName={"active"}/>

                <div className="col mb-3">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new book</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>  
        )

    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }


    getBooksPage = (offset,nextPageOffset) => {
        return this.props.books.map((term, index) => {
            return (
                <BookTerm term={term} onDelete={this.props.onDelete} onEdit={this.props.onEdit} onMark={this.props.onMark}/>
            )
        })
        .filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
        
    }


}

// const Books = (props) => {

//     return (
//         <div>
//             <div>
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Category</th>   
//                                 <th>Author</th>
//                                 <th>Copies</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {props.books.map((term) => {
//                                 return (
//                                     <BookTerm term={term} onDelete={props.onDelete} onEdit={props.onEdit} onMark={props.onMark}/>
//                                 )
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="col mb-3">
//                     <div className="row">
//                         <div className="col-sm-12 col-md-12">
//                             <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new book</Link>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )

// }

export default Books