import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Certificate from '~/components/Certificate';
import { certificationService } from '~/services/certificationService';

function CertificatePage() {
    const { certificateId } = useParams();

    const navigate = useNavigate();
    const [certificateState, setCertificateState] = useState({});

    useEffect(() => {
        certificationService.getById(certificateId).then((data) => {
            if (data.id) {
                setCertificateState(data);
            } else {
                navigate('/home');
            }
        });
    }, [certificateId]);

    return (
        <div>
            <Certificate certificate={certificateState} />
        </div>
    );
}

export default CertificatePage;
