import { React, useEffect, useState } from 'react';
import "./converter.scss"
import Select from 'react-select';

const Converter = () => {
    const [currenciesData, setcurrenciesData] = useState([]);
    const [amount, setamount] = useState(0);
    const [rates, setrates] = useState(0);
    const [from, setfrom] = useState("TND");
    const [to, setto] = useState("TND");
    const apiKey = "c0e10352abdceba6ba587444"
    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
            .then(response => response.json())
            .then(result => setrates(result.conversion_rate))
            .catch(error => console.log('error converter', error));


    }, [to, from]);


    useEffect(() => {

        const options = { method: 'GET', headers: { accept: 'application/json' } };

        fetch('https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=6016ec439a454091937195d547dc2884', options)
            .then(response => response.json())
            .then(response => { setcurrenciesData(response); })
            .catch(err => console.error(err));

    }, []);
    const data = Object.keys(currenciesData).map(key => ({ value: key, label: currenciesData[key] }));

    return (
        <div className='converter'>
            <div className='titre'>Montant</div>
            <input placeholder='0' type="number" onChange={(choice) => setamount(choice.target.value)} />
            <div className="selectContainer">
                <div className="select">
                    <div className="selectText">Devise de départ</div>
                    <Select className="selectInput" options={data} onChange={(choice) => setfrom(choice.value)} />
                </div>
                <div className="select">
                    <div className="selectText"> Devise de sortie</div>
                    <Select className="selectInput"
                        options={data}
                        onChange={(choice) => setto(choice.value)}
                        menuPlacement="auto"
                        isSearchable
                        isClearable={false} />
                </div>
            </div>
            <div className="result">
                {amount * rates} <span>{to}</span>
            </div>
        </div>
    );
}

export default Converter;
