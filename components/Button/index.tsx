import styles from './index.module.css'
import cx from 'classnames'

interface ButtonProps {
  isLoading: Boolean
  children: any
  disabled?: any,
  type?: any,
  onClick?: any,
  className?: string
}

const Loader = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.waves} />
      <div className={styles.waves} />
      <div className={styles.waves} />
      <div className={styles.waves} />
      <div className={styles.waves} />
    </div>
  )
}

const Button = ({ isLoading, children, disabled, type = 'button', onClick, className = '' }: ButtonProps) => {
  return (
    <button onClick={onClick} className={cx(className, styles.btn)} disabled={disabled} type={type}>
      {isLoading ? <Loader /> : <>{children}</>}
    </button>
  )
}

export default Button
