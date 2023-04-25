import React from "react";

const categories = (props) => {

    return (
        <div>
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Categories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.categories.map((term) => {
                                return (
                                    <tr>
                                        <td>{term}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default categories