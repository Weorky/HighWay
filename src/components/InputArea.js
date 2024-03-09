import React from "react";
import { useState } from "react";
import './input.css'
// import Select from 'react-select';

const InputArea = ({add, controlVis}) => {

  //選單資料
  const data = [
    {
      name: '國道一號', value: '00010',
      states: [
        {
          name: '基隆市', value:'C'
        },
        {
          name: '台北市', value:'A'
        },
        {
          name: '新北市', value:'F'
        },
        {
          name: '桃園市', value:'H'
        },
        {
          name: '新竹縣', value:'J'
        },
        {
          name: '新竹市', value:'O'
        },
        {
          name: '苗栗縣', value:'K'
        },
        {
          name: '台中市', value:'B'
        },
        {
          name: '彰化縣', value:'N'
        },
        {
          name: '雲林縣', value:'P'
        },
        {
          name: '嘉義縣', value:'Q'
        },
        {
          name: '嘉義市', value:'I'
        },
        {
          name: '台南市', value:'D'
        },
        {
          name: '高雄市', value:'E'
        }
      ]
    },
    {
      name: '汐止五股高架路段', value: '0001A',
      states: [
        {
          name: '台北市', value: 'A'
        },
        {
          name: '新北市', value: 'F'
        }
      ]
    },
    {
      name: '五股楊梅高架路段', value: '0001B',
      states: [
        {
          name: '新北市', value: 'F'
        },
        {
          name: '桃園市', value: 'H'
        }
      ]
    },
    {
      name: '國道三號', value: '00030',
      states: [
        {
          name: '基隆市', value:'C'
        },
        {
          name: '台北市', value:'A'
        },
        {
          name: '新北市', value:'F'
        },
        {
          name: '桃園市', value:'H'
        },
        {
          name: '新竹縣', value:'J'
        },
        {
          name: '新竹市', value:'O'
        },
        {
          name: '苗栗縣', value:'K'
        },
        {
          name: '台中市', value:'B'
        },
        {
          name: '彰化縣', value:'N'
        },
        {
          name: '南投縣', value:'M'
        },
        {
          name: '雲林縣', value:'P'
        },
        {
          name: '嘉義縣', value:'Q'
        },
        {
          name: '嘉義市', value:'I'
        },
        {
          name: '台南市', value:'D'
        },
        {
          name: '高雄市', value:'E'
        },
        {
          name: '屏東縣', value:'T'
        }
      ]
    },
    {
      name: '國道五號', value: '00050',
      states: [
        {
          name: '台北市', value:'A'
        },
        {
          name: '宜蘭縣', value:'G'
        }
      ]
    }
  ]

  //控制React Components
  const [direction, setDirection] = useState('--Direction--')
  const [freeway, setFreeway] = useState('--Freeway Number--');
  const [city, setCity] = useState('--City--');
  const [cities, setCities] = useState([]);

  const [marginTop, setMarginTop] = useState(240)
  const [inputColor, setInputColor] = useState('rgba(237, 237, 233, 0.7)')

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  }
  const handleFreewayChange = (event) => {
    setFreeway(event.target.value);
    setCities(data.find(fwt => fwt.value === event.target.value).states)
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleMarginChange = () => {
    setMarginTop(50)
  }

  const handleInputColorChange = () => {
    setInputColor('transparent')
  }

  const passInfo = () => {
    add(function() {
      return[{
        direction,
        freeway,
        city
      }];
    });
    controlVis(function() {
      return(true)
    });
    handleMarginChange();
    handleInputColorChange();
  };

  
  return (
    <div className="content" style={{backgroundColor: inputColor, marginTop: `${marginTop}px`, transition: 'margin-top 0.5s'}}>
      <h1>Taiwan Freeway Speed</h1>
      <div className="input_area">
          <select className="selectline selectline1" value={direction} onChange={handleDirectionChange}>
              <option>-- Direction --</option>
              <option value={0}>順向</option>
              <option value={1}>逆向</option>
          </select>

          <select className="selectline selectline2" value={freeway} onChange={handleFreewayChange}>
              <option>-- Freeway Number --</option>
              {data.map(fwt => (
                <option value={fwt.value}>{fwt.name}</option>
              ))}
          </select>

          <select className="selectline selectline3" value={city} onChange={handleCityChange}>
                <option>-- City --</option>
                {cities.map((city) => (
                  <option value={city.value}>{city.name}</option>
                ))}
          </select>
          <button onClick = {() => {
            passInfo(); 
            }}>查詢</button>
      </div>
    </div>
  );
};

export default InputArea;