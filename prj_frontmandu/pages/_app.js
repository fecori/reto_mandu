import {ConfigProvider} from 'antd';
import esES from 'antd/locale/es_ES';
import '../styles/globals.scss'

export default function App({Component, pageProps}) {
    return <ConfigProvider locale={esES}>
      <Component {...pageProps} />
    </ConfigProvider>
}
