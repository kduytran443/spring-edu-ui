import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Certificate from '~/components/Certificate';
import { certificationService } from '~/services/certificationService';

function CertificatePage() {
    const { certificateId } = useParams();

    const [certificateState, setCertificateState] = useState({});

    useEffect(() => {
        certificationService.getById(certificateId).then((data) => {
            if (data.id) {
                setCertificateState(data);
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
