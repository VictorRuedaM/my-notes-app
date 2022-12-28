import Markdown from 'react-remarkable';

function Preview({text}) {
  return (
    <div className='preview'>
      <Markdown source={text}/>
    </div>
  )
}

export default Preview