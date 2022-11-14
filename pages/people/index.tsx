import PersonCard from '../../components/PersonCard'
import { UserType } from '../../redux/slices/types'
import instance from '../../axios'

import styles from './People.module.scss'
import Paper from '@mui/material/Paper'
import { Divider } from '@mui/material'

const People = ({ users }) => {
  return (
    <Paper className={styles.paper}>
      <div className={styles.list}>
        {users.map((user: UserType) => (
          <div key={user._id}>
            <div className={styles.item}>
              <PersonCard user={user} />
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </Paper>
  )
}

export default People

export const getServerSideProps = async () => {
  const { data } = await instance.get('/users')

  return {
    props: { users: data },
  }
}
