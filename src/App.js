import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BasicTabs from './components/basicTabs'
import { presentFetched, quittingFetched, loadingStatusChanged } from './redux/MainSlice'

function App() {
    const dispatch = useDispatch()
    const infoRef = useRef()
    const { patientInfo, loadingStatus } = useSelector((state) => state.main)

    useEffect(() => {
        let quittingReq = new XMLHttpRequest()
        quittingReq.open('GET', 'https://api.jsonbin.io/v3/b/634e6c812b3499323be27565/', true)
        dispatch(loadingStatusChanged('loading'))
        quittingReq.setRequestHeader(
            '$2b$10$Mv3MimaSkQldJq0VUBSUB.rTf4oxIwIZthuHiiCsLUSpH0wYkB.Tm',
            '$2b$10$yhl80auTz.cXGt26cM4LgOFoAm4BvRc.dBpRrIJfQ/6ckU59ld.9K',
        )
        quittingReq.send()
        quittingReq.onload = function () {
            if (quittingReq.status === 200) {
                dispatch(quittingFetched(JSON.parse(quittingReq.response).record.quittingList))
                dispatch(loadingStatusChanged('loaded'))
            }
        }

        quittingReq.onerror = function () {
            alert('Запрос не удался')
        }
        let presentReq = new XMLHttpRequest()
        presentReq.open('GET', 'https://api.jsonbin.io/v3/b/634e6c710e6a79321e2c5c65/', true)
        dispatch(loadingStatusChanged('loading'))
        presentReq.setRequestHeader(
            '$2b$10$Mv3MimaSkQldJq0VUBSUB.rTf4oxIwIZthuHiiCsLUSpH0wYkB.Tm',
            '$2b$10$yhl80auTz.cXGt26cM4LgOFoAm4BvRc.dBpRrIJfQ/6ckU59ld.9K',
        )
        presentReq.send()
        presentReq.onload = function () {
            if (quittingReq.status === 200) {
                dispatch(presentFetched(JSON.parse(presentReq.response).record.presentList))
                dispatch(loadingStatusChanged('loaded'))
            }
        }
        presentReq.onerror = function () {
            alert('Запрос не удался')
        }
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
                {loadingStatus === 'loaded' ? (
                    <BasicTabs />
                ) : (
                    <div className='progress-wrapper'>
                        <CircularProgress />
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
