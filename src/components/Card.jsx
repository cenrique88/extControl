
import './styles/card.css'






const Card = (props) => {

    const {} = props;







  return (
    <div className="card"> 

    <div className="id">ID</div>
    <div className='ubicacion'>ubicacion</div>
    <div className='tipo'>tipo</div>
    <div className='capacidad'>capacidad</div>
    <div className='recarga-cada'>recarga</div>
    <div className='ultima-recarga'>recarga</div>
    <div className='fecha-vencimiento'>vencimiento</div>
    <div className='tiempo-faltante'>faltante</div>   

    </div>
  )
}

export default Card

