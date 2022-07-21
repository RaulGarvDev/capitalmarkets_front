import React from 'react'
import Spinner from './Spinner'


function ConvertResult({ Loading, result, rates }) {


    console.log("Esto es lo que queremos" + result);
    return (
        <>
            {Loading ? (
                <Spinner />
            ) : (
                result &&
                rates && (
                    <>
                        <h4 className="result">Tienes como cambio:{result}</h4>
                         {/* <h4 className="rate">{rates}</h4> */}
                        
                    </>
                )
         
            )}
        </>
    )
}

export default ConvertResult
