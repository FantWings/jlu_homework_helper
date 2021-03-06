import { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class Bars extends Component {
  //初始化函数
  state = {
    isNotices: false,
    status: '',
    title: '',
    text: '',
    paper_id: '',
    submit_time: '',
  }

  //组件挂载后订阅消息
  componentDidMount() {
    this.pubsub_token = PubSub.subscribe('barinfo', (_, data) => {
      this.setState({ ...data })
    })
  }

  //组件卸载后取消订阅消息
  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsub_token)
  }

  render() {
    const { isNotices, status, title, text, paper_id, submit_time } = this.state
    return isNotices ? (
      <span id="notices" className="bar error">
        <p>本工具仅供交流学习用途！任何因本工具导致的问题将不会为你付任何责任！</p>
        <small id="info">
          试卷号（UUID）：{paper_id} 丨 提交时间：{submit_time}
        </small>
      </span>
    ) : (
      <span className={'bar ' + status} style={{ display: status ? 'block' : 'none' }}>
        <h3 id="msg_tittle">{title}</h3>
        <small id="msg_text">{text}</small>
      </span>
    )
  }
}
