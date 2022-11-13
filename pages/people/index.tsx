import { useEffect } from 'react'

import PersonCard from '../../components/PersonCard'
import { UserType } from '../../redux/slices/types'
import instance from '../../axios'

import styles from './People.module.scss'
import Paper from '@mui/material/Paper'
import { Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { peopleSelector } from '../../redux/slices/people'
import { useAppDispatch } from '../../redux/store'
import { fetchPeople } from '../../redux/asyncActions'

const People = () => {
  const dispatch = useAppDispatch()

  const users = useSelector(peopleSelector)

  useEffect(() => {
    dispatch(fetchPeople())
  }, [])

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
