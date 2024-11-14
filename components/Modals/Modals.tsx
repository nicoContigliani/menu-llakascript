"use client"

import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import styles from './ModalComponent.module.css'

export default function Modals(props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <div onClick={showModal}>Abrir Modal</div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        closable={false}
        wrapClassName={styles.customModalWrap}
        modalRender={(modal) => (
          <div className={styles.overlay}>
            <div className={styles.container}>
              <button className={styles.closeButton} onClick={handleCancel}>
                ×
              </button>
              <div className={styles.textContainer}>
                <h1 className={styles.title}>Título del Modal</h1>
                <p className={styles.titleApp}>Subtítulo del Modal</p>
              </div>
              {props?.children}
              {/* <div className={styles.image}>
                <img src="/placeholder.svg?height=150&width=150" alt="Imagen" />
              </div> */}

              {/* <button className={styles.actionButton} onClick={handleOk}>
                Acción
              </button> */}
              
            </div>
          </div>
        )}
      />
    </div>
  )
}