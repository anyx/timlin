<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use JMS\Serializer\Annotation as Serializer;
use App\Exception\DocumentException;

/**
 * @MongoDB\MappedSuperclass
 * @MongoDB\InheritanceType("COLLECTION_PER_CLASS")
 */
abstract class AbstractDocument
{
    /**
     * @MongoDB\Id
     * @Serializer\Groups({"Editor"})
     */
    protected $id;

    /**
     * @MongoDB\String
     * @Serializer\Groups({"Editor"})
     */
    protected $title;

    /**
     * @MongoDB\String
     * @Serializer\Groups({"Editor"})
     */
    protected $description = '';
    
    /**
     * @Serializer\Groups({"Editor"})
     * @MongoDB\Date
     */
    protected $createdAt;
    
    /**
     * @var type 
     */
    protected $owner;
    
    /**
     * @MongoDB\EmbedMany(targetDocument="AbstractDocument")
     * @Serializer\Groups({"Editor"})
     * @Serializer\Type("Array")
     */
    protected $versions = array();

    /**
     * @MongoDB\ObjectId
     * @Serializer\Groups({"Editor"})
     */
    protected $currentVersionId;

    /**
     * @param \App\Document\AbstractContent $name Description
     */
    abstract function createVersionContent(AbstractContent $content = null);

    /**
     * 
     * @param strings $title
     */
    public function __construct($title)
    {
        $this->title = $title;

        $content = $this->createVersionContent();
        $content->setTitle('1');
        $this->addVersion($content);
        $this->setCurrentVersionId($content->getId());
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    public function getOwner()
    {
        return $this->owner;
    }

    public function setOwner($owner)
    {
        $this->owner = $owner;
    }

    /**
     * 
     * @return array
     */
    public function getVersions()
    {
        return $this->versions;
    }

    /**
     * 
     * @return \App\Document\AbstractContent
     * @throws \App\Exception\DocumentException
     */
    public function getCurrentVersion()
    {
        if (empty($this->currentVersionId)) {
            throw new DocumentException('Current version not found');
        }
        
        foreach($this->getVersions() as $version) {
            if ($version->getId() == $this->currentVersionId) {
                return $version;
            }
        }
        
        throw new DocumentException('Current version not found by id');
    }

    /**
     * 
     * @param \MongoId $versionid
     */
    public function setCurrentVersionId(\MongoId $versionid)
    {
        $this->currentVersionId = $versionid;
    }

    /**
     * 
     * @return integer
     */
    public function getCountVersions()
    {
        return count($this->getVersions());
    }

    public function createVersion()
    {
        $version = $this->createVersionContent(
            $this->getCurrentVersion()
        );
        $version->setTitle($this->getCountVersions());
        $this->addVersion($version);
    }

    /**
     * 
     * @param \App\Document\AbstractContent $content
     */
    protected function addVersion(AbstractContent $content)
    {
        $this->versions[] = $content;
    }
}
