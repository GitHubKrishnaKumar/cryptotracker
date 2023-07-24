import React, { useEffect, useState } from 'react'
import Header from '../component/Common/Header';
import TabsComponent from '../component/Dashboard/Tabs';
import axios from 'axios';
import Search from '../component/Dashboard/Search';
import PaginationComponent from '../component/Dashboard/Pagination';
import Loader from '../component/Common/Loader';
import BackToTop from '../component/Common/BackToTop';

function DashboardPage() {
    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState("");
    const[page, setPage] = useState(1);
    const[isLoading, setIsLoading] = useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);
        var previousIndex = (value-1) * 10;
        setPaginatedCoins(coins.slice(previousIndex,previousIndex + 10));
    };
    const onSearchChange =(e)=>{
        setSearch(e.target.value);
    };

    var filterCoins = coins.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) 
        || 
        item.symbol.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() =>{    
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then((response) =>{
            console.log("Response",response);
            setCoins(response.data);
            setPaginatedCoins(response.data.slice(0,10));
            setIsLoading(false);
        })
        .catch((error)=>{
            console.log("Erros",error);
        });
    }, []);
  return (
    <>
        <Header />
        <BackToTop />
        {isLoading ? 
            (<Loader/>)
            :(
                <div>
                    
                    <Search search={search} onSearchChange={onSearchChange}/>
                    <TabsComponent 
                    coins={search ? filterCoins : paginatedCoins}
                    />
                    {!search && (
                        <PaginationComponent
                        page={page}
                        handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            )
        }   
    </>
  )
}

export default DashboardPage;