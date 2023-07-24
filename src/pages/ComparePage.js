import React, { useEffect, useState } from 'react'
import Header from '../component/Common/Header'
import SelectCoins from '../component/Compare/SelectCoins'
import SelectDays from '../component/Coin/SelectDays';
import { coinObject } from '../functions/convertObject';
import { getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartData';
import { getCoinData } from '../functions/getCoinData';
import Loader from '../component/Common/Loader';
import List from '../component/Dashboard/List';
import CoinInfo from '../component/Coin/CoinInfo';
import LineChart from '../component/Coin/LineChart/lineChart';
import PriceType from '../component/Coin/PriceType';

function ComparePage(noPtag) {
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [days, setDays] = useState(60);
    const [crypto1Data, setCrypto1Data] = useState({})
    const [crypto2Data, setCrypto2Data] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [priceType, setPriceType] =useState("prices");
    const [chartData, setChartData] = useState({});

    async function handleDaysChange(event){
        setIsLoading(true);
        setDays(event.target.value);
        const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
        const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);
        settingChartData(setChartData, prices1,prices2);
        setIsLoading(false);
    };

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const prices1 = await getCoinPrices(crypto1, days, newType);
        const prices2 = await getCoinPrices(crypto2, days, newType);
        settingChartData(setChartData, prices1,prices2);
        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setIsLoading(true);
        const data1 = await getCoinData(crypto1);
        if(data1){
            const data2 = await getCoinData(crypto2);
            coinObject(setCrypto1Data, data1);
            if(data2){
            coinObject(setCrypto2Data, data2);
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);
                settingChartData(setChartData, prices1,prices2);
                console.log("BOth Prices Fetch",prices1, prices2);
                setIsLoading(false);
            }
        }
    }

    const handleCoinChange = async (event, isCoin2) => {
        setIsLoading(true);
        if(isCoin2){
            setCrypto2(event.target.value);
            const data = await getCoinData(event.target.value);
            coinObject(setCrypto2Data, data);
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);
            if(prices1.length > 0 && prices2.length > 0){
                // settingChartData(setChartData, prices, data);
                console.log("BOth Prices Fetch",prices1, prices2);
                setIsLoading(false);
            }
        }
        else{
            setCrypto1(event.target.value);
            const data = await getCoinData(event.target.value);
            coinObject(setCrypto1Data, data);
        }
    };

  return (
    <div>
        <Header />
        {isLoading ? 
            <Loader /> : (
            <>
                <div className='coins-days-flex'>
                <SelectCoins 
                    crypto1={crypto1} 
                    handleCoinChange={handleCoinChange}
                    crypto2={crypto2} 
                />
                <SelectDays days={days} handleDaysChange={handleDaysChange} noPtag={noPtag} />
                </div>
                <div className='grey-wrapper' style={{padding: "0rem 1rem"}}>
                    <List coin={crypto1Data} />
                </div>
                <div className='grey-wrapper' style={{padding: "0rem 1rem"}}>
                    <List coin={crypto2Data} />
                </div>
                <div className='grey-wrapper'>
                <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
                    <LineChart 
                        chartData={chartData} 
                        priceType={priceType}
                        multiAxis={true}    
                    />
                </div>
                <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc}/>
                <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc}/>
            </>
        )}
    </div>
  )
}

export default ComparePage