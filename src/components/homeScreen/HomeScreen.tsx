import './homescreen.scss';

const HomeScreen = () => {
  return (
    <section className='home-screen'>
        <p>Create a new list for reminders or view existing lists</p>
        <div className='home-screen-btns'>
          <h1>Source Code:</h1>
          <a href='https://github.com/trisdauvergne/ui-reminders-client' target="_blank" rel="noreferrer">Client</a>
          <a href='https://github.com/trisdauvergne/ui-reminders-server' target='_blank' rel="noreferrer">Server</a>
        </div>
    </section>
  )
}

export default HomeScreen