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
     * @Serializer\Groups({"Editor", "Viewer"})
     */
    protected $id;

    /**
     * @MongoDB\String
     * @Serializer\Groups({"Editor", "Viewer"})
     */
    protected $title;

    /**
     * @MongoDB\String
     * @Serializer\Groups({"Editor", "Viewer"})
     */
    protected $description = '';

    /**
     * @Serializer\Groups({"Editor", "Viewer"})
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
     * 
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $versions = array();

    /**
     * @MongoDB\ObjectId
     * @Serializer\Groups({"Editor"})
     */
    protected $currentVersionId;

    /**
     * @MongoDB\Boolean
     * @Serializer\Type("boolean")
     * @Serializer\Groups({"Editor"})
     */
    protected $published = false;

    /**
     * @param \App\Document\AbstractContent $parentVersion Description
     */
    abstract function createVersionContent(AbstractContent $parentVersion = null);

    /**
     * 
     * @param strings $title
     */
    public function __construct($title)
    {
        $this->title = $title;

        $version = $this->createVersion();
        $this->setCurrentVersionId($version->getId());
        
        $this->versions = new \Doctrine\Common\Collections\ArrayCollection();
        $this->addVersion($version);
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

    public function getPublished()
    {
        return $this->published;
    }

    public function setPublished($published)
    {
        $this->published = $published;
    }

    /**
     * @Serializer\VirtualProperty
     * @Serializer\Type("array")
     * @Serializer\Groups({"Viewer"})
     * @Serializer\SerializedName("versions")
     */
    public function getPublicVersions()
    {
        /* @var $version \App\Document\AbstractContent */
        return array_values($this->versions->filter(function($version) {
            return $version->isPublished();
        })->toArray());
    }

    /**
     * 
     * @return \App\Document\AbstractContent
     * @throws \App\Exception\DocumentException
     */
    public function getCurrentVersion()
    {
        if (empty($this->currentVersionId)) {
            return null;
        }

        foreach ($this->getVersions() as $version) {
            if ($version->getId() == $this->currentVersionId) {
                return $version;
            }
        }

        throw new DocumentException('Current version not found by id');
    }

    /**
     * 
     * @param string $versionid
     */
    public function setCurrentVersionId($versionid)
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

    /**
     * @return \App\Document\AbstractContent
     */
    public function createVersion(AbstractContent $parentVersion = null)
    {
        if (empty($parentVersion)) {
            $parentVersion = $this->getCurrentVersion();
        }
        $version = $this->createVersionContent($parentVersion);
        $version->setTitle('Version ' . ($this->getCountVersions() + 1));
        $this->addVersion($version);

        return $version;
    }

    /**
     * 
     * @param string $versionId
     * @return \App\Document\AbstractContent
     * @throws \LogicException
     */
    public function getVersion($versionId)
    {
        foreach ($this->getVersions() as $version) {
            if ($versionId == $version->getId()) {
                return $version;
            }
        }
        throw new \LogicException('Version "' . $versionId . '" not found');
    }

    /**
     * 
     * @param string $versionId
     * @return boolean
     * @throws \LogicException
     */
    public function removeVersion($versionId)
    {
        if ($versionId == $this->currentVersionId) {
            throw new \LogicException('Can\'t remove current version "'.$versionId.'"');
        }
        
        $foundVersion = $this->getVersion($versionId);
        
        if (!$foundVersion->hasParent()) {
            throw new \LogicException('Can not remove root version');
        }
        
        foreach ($this->versions as $key => $version) {
            if ($version->getId() == $foundVersion->getId()) {
                unset($this->versions[$key]);
                return true;
            }
        }
        
        return false;
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
