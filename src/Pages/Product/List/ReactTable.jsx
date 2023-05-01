import { useState, useEffect, useMemo } from 'react';
import Pagination from '../../../Components/Pagination';
import TableColumns from '../../../Components/Tablecolumns';

const MyComponent = ({ select }) => {

    const pagination = true;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentpages, setCurrentpages] = useState([]);
    const perPageData = 9;
    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id));
    };
    const indexOfLast = currentPage * perPageData;
    const indexOfFirst = indexOfLast - perPageData;
    const currentdata = useMemo(() => select.slice(indexOfFirst, indexOfLast), [select, indexOfFirst, indexOfLast]);

    useEffect(() => {
        setCurrentpages(currentdata)
    }, [currentPage, select, currentdata])
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(select.length / perPageData); i++) {
        pageNumbers.push(i);
    }
    const handleprevPage = () => {
        let prevPage = currentPage - 1;
        setCurrentPage(prevPage);
    };
    const handlenextPage = () => {
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    };
    useEffect(() => {
        if (pageNumbers.length && pageNumbers.length < currentPage) {
            setCurrentPage(pageNumbers.length)
        }
    }, [currentPage, pageNumbers.length]);
    return (
        <>
            <TableColumns data={select} />
            <Pagination
                pagination={pagination}
                pageNumbers={pageNumbers}
                currentpages={currentpages}
                currentPage={currentPage}
                handleprevPage={handleprevPage}
                handleClick={handleClick}
                handlenextPage={handlenextPage}
            />
        </>
    );
};

export default MyComponent;