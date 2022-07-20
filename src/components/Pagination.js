import React from "react";
import styles from "./Pagination.module.css"

const Pagination = ({lecturesPerPage, searchedLectures, paginate, currentPage}) => {

    const PageNumeber = [];
    const current = currentPage;

    

    for (let i = 1; i <= Math.ceil(searchedLectures / lecturesPerPage); i++) {
        PageNumeber.push(i);
        
    }


    const onClick = (number, e) => {
        paginate(number);
    }

    return (
        <nav>
            <ul className={styles.pagination}>
                {PageNumeber.map(number  => (
                    <li key={number} onClick={ e =>onClick(number, e)} href='!#' className={`${styles.pageItem} ${current === number ? styles.active : "a"}`}>
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;