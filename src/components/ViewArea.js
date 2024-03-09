import React, { useEffect } from "react";
import { useState } from "react";
import './view.css'

const ViewArea = ({ info, showVis}) => {
    console.log(info)

    const [dir, setDir] = useState('');
    const [freewaycode, setFreewaycode] = useState('');
    const [citycode, setCitycode] = useState('')
    const [aveSpeed, setAveSpeed] = useState('');
    const [maxSpeed, setMaxSpeed] = useState('');
    const [minSpeed, setMinSpeed] = useState('');
    const [updateTime, setUpdateTime] = useState('')

    //判斷User是否重新輸入並更新
    useEffect(() => {
        if (info.length > 0) {
            setDir(info[0]['direction'])
            setFreewaycode(info[0]['freeway'])
            setCitycode(info[0]['city'])
        }
    }, [info]);

    // console.log(dir,freewaycode,citycode)


    //
    useEffect(() => {
        if(freewaycode){
            //API驗證網址跟資訊
            const auth_url = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token'
            const parameters = {
                grant_type:"client_credentials",
                client_id: "yumeo98.aoz0021-3c458838-a034-4c18",
                client_secret: "a9af7eac-602a-4e6f-b9d8-71b5dae2d5ad"
            }

            let url = `https://tdx.transportdata.tw/api/basic/v2/Road/Traffic/Live/VD/Freeway?%24filter=LinkFlows%2Fany%28d%3A%28startswith%28d%2FLinkID%2C%20%270${freewaycode}0${dir}%27%29%20and%20endswith%28d%2FLinkID%2C%20%27${citycode}%27%29%29%29&%24top=60&%24format=JSON`
            
            fetch(auth_url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(parameters),
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  console.log('New User Data:', data);
                  let accessToken = data.access_token;
                  console.log('Access Token:', accessToken);
                  return fetch(url, {
                    method: 'GET',
                    headers: {
                        "authorization": "Bearer " + accessToken,
                    },
                  });
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log('API Link', response);
                    return response.json();
                })
                .then(apiData => {
                    console.log('API Data:', apiData);
                    
                    let totalSpeed = 0;
                    let maxs = -Infinity;
                    let mins = Infinity;

                    for (let i = 0; i < apiData['VDLives'].length; i++){
                        const currentSpeed = apiData['VDLives'][i]['LinkFlows'][0]['Lanes'][0]['Speed'];
                        if(currentSpeed !== -99 && currentSpeed !== 0){
                            if(currentSpeed > maxs){
                                maxs = currentSpeed;
                            }
                            if (currentSpeed < mins) {
                                mins = currentSpeed;
                            }   
                            totalSpeed += currentSpeed
                        }
                    }
                    let averageSpeed = Math.round(totalSpeed / apiData['VDLives'].length)
                    setAveSpeed(averageSpeed);
                    setMaxSpeed(maxs);
                    setMinSpeed(mins);

                    // 取得目前時間並設定狀態
                    const currentDate = new Date();
                    const currentTime = currentDate.toLocaleTimeString();
                    setUpdateTime(currentTime);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
    },[freewaycode,dir,citycode])


    return showVis && (
        <div className="view_area animated">
          <div className="speed_area">
            <div className="ave_speed">
              <h2>Average Speed</h2>
              <p>{aveSpeed}</p>
            </div>
            <div className="aside_speed">
              <div className="max_speed">
                <h3>Max Speed</h3>
                <p>{maxSpeed}</p>
              </div>
              <div className="min_speed">
                <h3>Low Speed</h3>
                <p>{minSpeed}</p>
              </div>
            </div>
          </div>
          <div className="update_time">
            <p>Update：{updateTime}</p>
          </div>
        </div>
      );      
}

export default ViewArea;