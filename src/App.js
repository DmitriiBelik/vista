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
        let quittingReq = new XMLHttpRequest()
        quittingReq.open('GET', 'https://api.jsonbin.io/v3/b/634e6c812b3499323be27565/', true)
        quittingReq.setRequestHeader(
            '$2b$10$Mv3MimaSkQldJq0VUBSUB.rTf4oxIwIZthuHiiCsLUSpH0wYkB.Tm',
            '$2b$10$yhl80auTz.cXGt26cM4LgOFoAm4BvRc.dBpRrIJfQ/6ckU59ld.9K',
        )
        quittingReq.send()
        quittingReq.onload = function () {
            dispatch(quittingFetched(JSON.parse(quittingReq.response).record.quittingList))
        }

        quittingReq.onerror = function () {
            alert('Запрос не удался')
        }
        let presentReq = new XMLHttpRequest()
        presentReq.open('GET', 'https://api.jsonbin.io/v3/b/634e6c710e6a79321e2c5c65/', true)
        presentReq.setRequestHeader(
            '$2b$10$Mv3MimaSkQldJq0VUBSUB.rTf4oxIwIZthuHiiCsLUSpH0wYkB.Tm',
            '$2b$10$yhl80auTz.cXGt26cM4LgOFoAm4BvRc.dBpRrIJfQ/6ckU59ld.9K',
        )
        presentReq.send()
        presentReq.onload = function () {
            dispatch(presentFetched(JSON.parse(presentReq.response).record.presentList))
        }

        presentReq.onerror = function () {
            alert('Запрос не удался')
        }
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
