import * as React from 'react'
import { Layout } from 'antd'
import { AppHeader } from '../AppHeader/AppHeader';
import { AppFooter } from '../AppFooter/AppFooter';
import { LeftMenu } from '../LeftMenu/LeftMenu';
import { AppRouter } from '../../core/router';
import { pushPath } from '../../core/history';
import { Auth } from '../../pages/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/modules';
import { clearCitiesState, getCitiesFailure, getCitiesRequest, getCitiesSuccess } from '../../store/modules/dictionaries/cities';
import { useApi } from '../../hooks/useApi';
import { IauthToken } from '../../hooks/useAuth';
import { clearTemplatesState, getTemplatesFailure, getTemplatesRequest, getTemplatesSuccess } from '../../store/modules/pages/templates';
import { clearParcelsSettingsState } from '../../store/modules/settings/parcels';
import { clearParcelsState } from '../../store/modules/pages/parcels';
import { ITemplate } from '../../interfaces/templates/ITemplate';

interface useloadSourseDto {
  authToken: IauthToken
}

export const useloadSourse = ():[(authData:IauthToken)=>void, ()=>void ] => {

  const dispatch = useDispatch();

  const clearStates = React.useCallback(() => {
    dispatch(clearParcelsSettingsState())
    dispatch(clearParcelsState())
    dispatch(clearCitiesState())
    dispatch(clearCitiesState())
    dispatch(clearTemplatesState())
  }, [])

  const load = React.useCallback((authData: IauthToken) => {
    // Загрузка справочника городов
    dispatch(getCitiesRequest())
    useApi<string[], {}>('cities', 'get', {}).then((response) => {
      dispatch(getCitiesSuccess(response))
    }).catch(err => {
      dispatch(getCitiesFailure(err))
    })

    // Загрузка шаблонов
    dispatch(getTemplatesRequest())
    useApi<ITemplate[], useloadSourseDto>('templates', 'get', {authToken: authData}).then((response) => {
      dispatch(getTemplatesSuccess(response))
    }).catch(err => {
      dispatch(getTemplatesFailure(err))
    })


  }, [])

  return [load, clearStates]
}

export const App = () => {

  const authData = useSelector((state: IState) => state.auth)
  const isAuth = authData.isAuth;

  if (!isAuth) {
    pushPath('/auth')
  }



  return (
    <>
      {isAuth ?
        <Layout>
          <AppHeader />
          <Layout>
            <LeftMenu />
            <Layout
              style={{
                padding: '0 24px',
              }}
            >
              <AppRouter />
            </Layout>
          </Layout>
          {AppFooter}
        </Layout> :
        <Auth />}
    </>
  );
};


