import './index.css'

const ChoiceItem = props => {
  const {eachItem, onClickUserChoice} = props
  const {imageUrl, id} = eachItem

  const onClickUser = () => {
    onClickUserChoice(id)
  }

  return (
    <li className="item">
      <button
        type="button"
        className="item-button"
        onClick={onClickUser}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <img src={imageUrl} alt={id} className="item-img" />
      </button>
    </li>
  )
}

export default ChoiceItem
