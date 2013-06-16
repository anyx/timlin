<?php

namespace Rest\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Rest\Form\Type\DocumentVersionType;
use App\Document\Article;

/**
 * @RouteResource("Document")
 */
class DocumentController extends Controller
{

    private $versionFields = array(
        'title',
        'published'
    );
        
    /**
     * @View(SerializerGroups={"Editor"})
     * 
     */
    public function postVersionAction($id, Request $request)
    {
        $document = $this->get('dm')->getRepository('App\Document\Article')->findUserDocumentById($this->getUser(), $id);
        if (empty($document)) {
            throw $this->createNotFoundException('Document not found');
        }

        $parentVersionId = $request->get('parent_version_id');
        if (empty($parentVersionId)) {
            throw $this->createNotFoundException('Parent document version not found');
        }

        try {
            $document->createVersion($document->getVersion($parentVersionId));
            $this->get('dm')->flush();
        } catch (\Exception $exception) {
            throw new HttpException(500, 'Can\'t create version', $exception);
        }

        return $document;
    }

    /**
     * @View
     * @param \Symfony\Component\HttpFoundation\Request $request
     */
    public function putVersionAction($id, Request $request)
    {
        /* @var $document \App\Document\AbstractDocument  */
        $document = $this->get('dm')->getRepository('App\Document\Article')->findUserDocumentById($this->getUser(), $id);
        if (empty($document)) {
            throw $this->createNotFoundException('Document not found');
        }

        $versionId = $request->get('version_id');

        try {
            $version = $document->getVersion($versionId);

            $versionForm = $this->createForm(new DocumentVersionType(), $version);

            $versionForm->submit($this->getVersionData($request));

            if ($versionForm->isValid()) {
                $this->get('dm')->flush();
                return $document;
            }
        
            throw new HttpException(400, 'Version is not valid');
            
        } catch (\Exception $exception) {
            throw new HttpException(500, 'Can\'t save version', $exception);
        }
    }

    /**
     * 
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return array
     */
    private function getVersionData(Request $request)
    {
        return array_intersect_key($request->request->all(), array_flip($this->versionFields));
    }
}
