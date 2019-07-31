import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Swal = withReactContent(swal);

const Open = View => 'object' === typeof View && Swal.fire({
    html: View,
    customClass: `default__dialog ${View.props.className||``}`,
    showConfirmButton: false,
    showCancelButton: false,
});

// const Close = dialog => Swal.close(dialog);
const CloseAll = () => Swal.close();

export default { 
    Open, 
    /* istanbul-ignore-next */
    CloseAll 
}