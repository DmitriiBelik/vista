import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BasicTabs from './components/basicTabs'
import { presentFetched, quittingFetched } from './redux/MainSlice'

function App() {
    const dispatch = useDispatch()
    const infoRef = useRef()
    const { patientInfo } = useSelector((state) => state.main)

    useEffect(() => {
        fetch('http://localhost:3000/presentList')
            .then((response) => response.json())
            .then((data) => dispatch(presentFetched(data)))
        fetch('http://localhost:3001/quittingList')
            .then((response) => response.json())
            .then((data) => dispatch(quittingFetched(data)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (Object.keys(patientInfo).length !== 0) {
            infoRef.current.style.outline = '2px solid #3299cc'
        } else {
            infoRef.current.style.outline = 'none'
        }
    }, [patientInfo])

    return (
        <div className='app-wrapper'>
            <div ref={infoRef} className='left-block'>
                <div className='left-header'>
                    Информация о пациенте
                    <ArrowBackIosIcon className='arrow' />
                </div>
                <div className='patient-info-wrapper'>
                    <div>ФИО</div>
                    <div className='info-area'>{patientInfo.fullName}</div>
                </div>
                <div className='patient-info-wrapper'>
                    <div>Возраст</div>
                    <div className='info-area'>{patientInfo.age}</div>
                </div>
                <div className='patient-info-wrapper'>
                    <div>Диагноз</div>
                    <div className='info-area'>{patientInfo.diagnosis}</div>
                </div>
            </div>
            <MoreVertIcon className='vertical' />
            <div className='right-block'>
                <BasicTabs />
            </div>
        </div>
    )
}

export default App
