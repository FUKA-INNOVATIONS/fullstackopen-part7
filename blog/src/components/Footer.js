const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
  // eslint-disable-next-line react/react-in-jsx-scope
    <div style={footerStyle} className={'footer'}>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      < br />
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <em>Blog app by FUKA 2021</em>
    </div>
  )
}

export default Footer